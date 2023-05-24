import pandas as pd
from gensim.models import FastText
from gensim.utils import tokenize
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

  # 데이터셋 로드
  if category == 'Albums':
    fileName = 'C:/Users/3ylsj/Desktop/캡디2/cap/src/components/auction/recommend/csv/database_albums.csv'
  elif category == 'Photo Cards':
    fileName = 'C:/Users/3ylsj/Desktop/캡디2/cap/src/components/auction/recommend/csv/database_photocards.csv'
  
  
  df = pd.read_csv(fileName)
  df = df.sample(frac=1).reset_index(drop=True)  # 셔플

  lower_df = df[['title','price']]
  lower_df = lower_df.apply(lambda x: x.str.lower() if x.dtype == 'object' else x)

  data = df['title']
  gensim_input = []
  for text in data:
    gensim_input.append(text.rstrip().lower())

  # 학습 데이터와 평가 데이터 분리
  train_data, test_data, train_labels, test_labels = train_test_split(df['title'], df['price'], test_size=0.2)

  train_data = list(train_data)
  test_data = list(test_data)
  test_labels = list(test_labels)
  
  # FastText 모델 학습
  ft_model = FastText(train_data, vector_size=100, min_count = 1, window = 5, workers=4, sg=1)
  ft_model.build_vocab(train_data)
  ft_model.train(train_data, total_examples = len(list(train_data)),epochs = 10 )

  query = title
  query= query.lower()
  query_vec = np.mean([ft_model.wv[word] for word in query.split()], axis=0)

  # 가장 유사한 문장을 찾습니다.
  similar_sentences = []
  prices = []

  for sentence in gensim_input:
      sentence_vec = np.mean([ft_model.wv[word] for word in sentence.split()], axis=0)
      similarity = cosine_similarity([query_vec], [sentence_vec])[0][0]
      similar_sentences.append((sentence, similarity))

  # 유사도가 높은 순으로 정렬한 후, 상위 2개 문장을 출력합니다.
  similar_sentences = sorted(similar_sentences, key=lambda x: x[1], reverse=True)[:2]
  for sentence_df in similar_sentences:
    sentence = sentence_df[0]
    price_df = lower_df[lower_df['title'] == sentence.lower()]

    if price_df.empty == True:
      continue
    price = price_df['price'].values
    for p in price:
      prices.append(p)  

  #################################### 예측값 및 정확도 측정 ####################################
  accurate_predictions = 0
  total_predictions = 0
  idx = 0
  for text in test_data:
    y_pred = []
    query= text.lower()
    query_vec = np.mean([ft_model.wv[word] for word in query.split()], axis=0)

    # 가장 유사한 문장을 찾습니다.
    similar_sentences = []
    for sentence in train_data:
        sentence_vec = np.mean([ft_model.wv[word] for word in sentence.split()], axis=0)
        similarity = cosine_similarity([query_vec], [sentence_vec])[0][0]
        similar_sentences.append((sentence, similarity))

    # 유사도가 높은 순으로 정렬한 후, 상위 2개 문장을 출력합니다.
    similar_sentences = sorted(similar_sentences, key=lambda x: x[1], reverse=True)[:2]
    for sentence_df in similar_sentences:
      sentence = sentence_df[0]
      price_df = lower_df[lower_df['title'] == sentence.lower()]
      if price_df.empty == True:
        continue
      price = price_df['price'].values
      for p in price:
        y_pred.append(p)

    maxPred = max(y_pred)
    minPred = min(y_pred)

    true_label = test_labels[idx]

    if minPred <= true_label <= maxPred:
      accurate_predictions += 1

    total_predictions += 1
    idx += 1

  print(total_predictions)