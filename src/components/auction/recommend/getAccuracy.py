import os
import glob
import pandas as pd
from gensim.models import FastText
from gensim.utils import tokenize
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from concurrent.futures import ThreadPoolExecutor
import multiprocessing

# 데이터셋 로드  
fileName = 'C:/Users/3ylsj/Desktop/캡디2/cap/src/components/auction/recommend/csv/database_albums.csv'
df = pd.read_csv(fileName)
df = df.sample(frac=1).reset_index(drop=True)  # 셔플

lower_df = df[['title', 'price']]
lower_df = lower_df.apply(lambda x: x.str.lower() if x.dtype == 'object' else x)

data = df['title']
gensim_input = [text.rstrip().lower() for text in data]

# 학습 데이터와 평가 데이터 분리
train_data, test_data, train_labels, test_labels = train_test_split(df['title'], df['price'], test_size=0.2)

train_data = list(train_data)
test_data = list(test_data)
test_labels = list(test_labels)

# FastText 모델 학습
ft_model = FastText(vector_size=100, min_count=1, window=5, workers=multiprocessing.cpu_count(), sg=1)
ft_model.build_vocab(sentences=train_data)
ft_model.train(sentences=train_data, total_examples=len(train_data), epochs=10)

#################################### 예측값 및 정확도 측정 ####################################
accurate_predictions = 0
total_predictions = 0
idx = 0


def calculate_similarity(query, sentence):
    query_vec = np.mean([ft_model.wv[word] for word in query.split()], axis=0)
    sentence_vec = np.mean([ft_model.wv[word] for word in sentence.split()], axis=0)
    similarity = cosine_similarity([query_vec], [sentence_vec])[0][0]
    return similarity


def find_similar_sentences(query):
    query = query.lower()
    similar_sentences = []
    for sentence in train_data:
        similarity = calculate_similarity(query, sentence)
        similar_sentences.append((sentence, similarity))
    similar_sentences = sorted(similar_sentences, key=lambda x: x[1], reverse=True)[:2]
    return similar_sentences


def predict_price(query):
    y_pred = []
    similar_sentences = find_similar_sentences(query)
    for sentence, _ in similar_sentences:
        price_df = lower_df[lower_df['title'] == sentence.lower()]
        if price_df.empty:
            continue
        prices = price_df['price'].values
        y_pred.extend(prices)
    return y_pred


def calculate_accuracy(idx, text):
    y_pred = predict_price(text)
    max_pred = max(y_pred) if y_pred else float('inf')
    min_pred = min(y_pred) if y_pred else float('-inf')
    true_label = test_labels[idx]
    return min_pred <= true_label <= max_pred


# 병렬 처리를 위한 ThreadPoolExecutor 설정
executor = ThreadPoolExecutor(max_workers=multiprocessing.cpu_count())

# 정확도 계산
futures = []
for idx, text in enumerate(test_data):
    future = executor.submit(calculate_accuracy, idx, text)
    futures.append(future)

# 결과 수집 및 출력
for future in futures:
    if future.result():
        accurate_predictions += 1
    total_predictions += 1

print(accurate_predictions)
