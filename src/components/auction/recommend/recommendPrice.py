import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time

cred = credentials.Certificate("C:/Users/3ylsj/Desktop/캡디2/cap/src/components/auction/recommend/capstone2023-57a1c-firebase-adminsdk-eval1-b382eff727.json")
firebase_admin.initialize_app(cred)

print('파이썬 서버 실행 중')
# 파이어스토어 연동
db = firestore.client()

import pandas as pd
from gensim.models import FastText
from gensim.utils import tokenize
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split

# 데이터셋 로드
df = pd.read_csv('C:/Users/3ylsj/Desktop/캡디2/cap/src/components/auction/recommend/temp_db_csv.csv')
df = df.sample(frac=1).reset_index(drop=True)  # 셔플

lower_df = df[['subtitle','price', 'category']]
lower_df = lower_df.apply(lambda x: x.str.lower() if x.dtype == 'object' else x)

data = df['subtitle']
gensim_input = []
for text in data:
    gensim_input.append(text.rstrip().lower())

# 학습 데이터와 평가 데이터 분리
train_data, test_data, train_labels, test_labels = train_test_split(df['subtitle'], df['price'], test_size=0.2)

train_data = list(train_data)
test_data = list(test_data)

# FastText 모델 학습
ft_model = FastText(min_count = 10, window = 5, vector_size = 100)
ft_model.build_vocab(train_data)
ft_model.train(train_data, total_examples = len(list(train_data)),epochs = 10 )

# 유사한 상품명 찾기
def search_similar(title, category):
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
    price_df = lower_df[lower_df['subtitle'] == sentence.lower()]

    if price_df.empty == True:
      continue
    price = price_df['price'].values[0]
    if price_df['category'].values[0] == category.lower():
      prices.append(price)

  return prices

def on_snapshot(doc_snapshot, changes, read_time):
    for change in changes:
        if change.type.name == 'ADDED':
            doc_id = change.document.id

            # 새로 추가된 문서 가져오기
            new_doc_ref = db.collection('recommendPrice').document(doc_id)
            new_doc = new_doc_ref.get()
            category = new_doc.to_dict()["category"]
            title = new_doc.to_dict()["title"]

            print(f'새로운 문서 추가. category: {category} title: {title}\n')
            recommendPrices = search_similar(title, category)
            if len(recommendPrices) > 0:
              maxPrice = max(recommendPrices)
              minPrice = min(recommendPrices)
              print("max min: ", maxPrice, minPrice)

              #파이어스토어에 추천 가격 수정
              new_doc_ref.update({"recommendMaxPrice": int(maxPrice), "recommendMinPrice":int(minPrice)})



doc_watch = db.collection(u'recommendPrice').on_snapshot(on_snapshot)

# 서버가 종료되지 않도록 무한루프를 실행
while True:
    time.sleep(0.5)
