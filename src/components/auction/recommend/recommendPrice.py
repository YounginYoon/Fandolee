import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time
import difflib

cred = credentials.Certificate("C:/Users/3ylsj/Desktop/캡디2/cap/src/components/auction/recommend/capstone2023-57a1c-firebase-adminsdk-eval1-b382eff727.json")
firebase_admin.initialize_app(cred)

print('파이썬 서버 실행 중')
db = firestore.client()

import pandas as pd
from gensim.models import FastText
from gensim.utils import tokenize
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 키워드 리스트
# 그룹
groups = ['방탄', 'bts', '방탄소년단','스트레이키즈', '스트레이 키즈', '스트래이키즈','스트래이 키즈', 'skz', '스키즈', '세븐틴', '새븐틴','svt', 'seventeen', 'nctdream', 'nct dream', '엔시티드림', '엔시티 드림', '앤시티드림', '앤시티 드림', 'nct127', 'nct 127','엔시티127','엔시티 127', '앤시티127', '앤시티 127', '에스파', '애스파', 'aespa', 'ive', '아이브', '뉴진스', '누진스', 'newjeans', 'new jeans','블랙핑크', '블랙 핑크', '블렉핑크', '블렉 핑크','블핑', 'blackpink', 'black pink','monstax','몬스타엑스', '몬스타 엑스', '몬스타액스', '몬스타 액스', '몬엑', '몬액']
# 상품 종류
categories = ['앨범','엘범','포토카드', '포토 카드', '미공포', '포카','인형','포스터']
# 그 외
ect = ['미개봉', '개봉', '비공굿', '비공식', '비공식 굿즈', '비공식굿즈', '풀셋', '풀세트', '풀 셋', '풀 세트', '싸인', '사인', '포자이']

#O(n^2), 문자열 검색 알고리즘
# 그룹 검색
def checkGroups(sentence):
  for group in groups:
    if group in sentence:
      return group
  return None

# 카테고리 검색
def checkCategory(sentence):
  ret = []
  for keyword in categories:
      if keyword in sentence and all(
          difflib.SequenceMatcher(None, keyword, other_keyword).ratio() >= 0.9
          for other_keyword in ret
      ):
          ret.append(keyword)
  if len(ret) == 0:
      return None
  else:
      return ret

# 그 외 키워드 검색
def checkEctKeyword(sentence):
  ret = []
  for keyword in ect:
      if keyword in sentence and all(
          difflib.SequenceMatcher(None, keyword, other_keyword).ratio() >= 0.9
          for other_keyword in ret
      ):
          ret.append(keyword)
  if len(ret) == 0:
      return None
  else:
      return ret

# 멤버 키워드 (그룹별로 나눔)
# 남돌
nctDream = ['천러', '지성', '런쥔', '마크', '제노', '재민', '해찬']
nct127 = ['태일', '쟈니', '태용', '유타', '도영', '재현', '윈윈', '정우', '마크', '해찬']
bts = ['알엠', 'rm', '정국', '뷔', '지민', '슈가', '제이홉', '진']
monstax = ['셔누', '민혁', '기현', '형원', '주헌', '아이엠', '창균']
svt = ['에스쿱스', '정한', '조슈아', '준', '호시', '원우', '우지', '디에잇', '민규', '도겸', '승관', '버논', '디노']
skz = ['방찬', '리노', '창빈', '현진', '한', '필릭스', '승민', '아이엔']

#여돌
newjeans = ['민지', '하니', '다니엘', '해린', '혜인']
blackpink = ['제니', '지수', '로제', '리사']
ive = ['안유진', '가을', '레이', '장원영', '리즈', '이서']
aespa = ['카리나', '윈터', '닝닝', '지젤']

groupMemberCheck = [
    nctDream,
    nct127,
    bts,
    monstax,
    svt,
    skz,
    newjeans,
    blackpink,
    ive,
    aespa
]

# 멤버 검색

# 그룹 별 그룹명 허용 리스트
# 남돌
nctDreamName = ['nctdream', 'nct dream', '엔시티드림', '엔시티 드림', '앤시티드림', '앤시티 드림']
nct127Name = ['nct127', 'nct 127','엔시티127','엔시티 127', '앤시티127', '앤시티 127']
btsName = ['방탄', 'bts', '방탄소년단']
mostaxName = ['monstax','몬스타엑스', '몬스타 엑스', '몬스타액스', '몬스타 액스', '몬엑', '몬액']
svtName = ['세븐틴', '새븐틴','svt', 'seventeen']
skzName = ['스트레이키즈', '스트레이 키즈', '스트래이키즈','스트래이 키즈', 'skz', '스키즈']

#여돌
newjeansName = ['뉴진스', '누진스', 'newjeans', 'new jeans']
blackpinkName = ['블랙핑크', '블랙 핑크', '블렉핑크', '블렉 핑크','블핑', 'blackpink', 'black pink']
iveName = ['ive', '아이브']
aespaName = ['에스파', '애스파', 'aespa']

groupNames = [
    nctDreamName,
    nct127Name,
    btsName,
    mostaxName,
    svtName,
    skzName,
    newjeansName,
    blackpinkName,
    iveName,
    aespaName
]

def checkMember(group, sentence):
  members = []
  words = sentence.split()

  for groupName in groupNames:
    if group in groupName:
      idx = groupNames.index(groupName)
      # 멤버 찾기
      for word in words:
        if word in groupMemberCheck[idx]:
          members.append(word)
  if len(members) == 0:
    return None
  else:
    return members

def checkSentence(sentence, combinedList):
  for word in combinedList:
    if word not in sentence:
      return False
  return True

# 유사한 상품명 찾기
def search_similar(title, category):
    # 데이터셋 로드
    if category == 'Albums':
        fileName = 'new_database_albums.csv'
    elif category == 'Photo Cards':
        fileName = 'new_database_photocards.csv'
    elif category == 'MD':
        fileName = 'new_database_md.csv'

    #내 컴퓨터 폴더 경로
    filePath = 'C:/Users/3ylsj/Desktop/캡디2/cap/src/components/auction/recommend/csv/'

    filePath += fileName

    df = pd.read_csv(filePath)
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
    ft_model = FastText(train_data, vector_size=100, min_count=1, window=5, workers=4, sg=1)
    ft_model.build_vocab(train_data)
    ft_model.train(train_data, total_examples=len(list(train_data)), epochs=10)

    query = title
    query = query.lower()
    query_vec = np.mean([ft_model.wv[word] for word in query.split()], axis=0)
    
    # 키워드 찾기
    group = checkGroups(query)
    category = checkCategory(query)
    ectKeyWord = checkEctKeyword(query)
    members = checkMember(group, query)

    # 리스트 하나로 묶기
    combinedKeyWords = []
    if group is not None:
      combinedKeyWords.append(group)
    if category is not None:
      combinedKeyWords.extend(category)
    if ectKeyWord is not None:
      combinedKeyWords.extend(ectKeyWord)
    if members is not None:
      combinedKeyWords.extend(members)

    # 가장 유사한 문장을 찾습니다.
    similar_sentences = []
    prices = []
    titles = []

    for sentence in gensim_input:
        sentence_vec = np.mean([ft_model.wv[word] for word in sentence.split()], axis=0)
        similarity = cosine_similarity([query_vec], [sentence_vec])[0][0]
        # 키워드가 담긴 유사 문장 뽑기
        if checkSentence(sentence.lower(), combinedKeyWords) == True:
          similar_sentences.append((sentence, similarity))

    # 유사도가 높은 순으로 정렬한 후, 상위 3개 문장을 출력합니다.
    similar_sentences = sorted(similar_sentences, key=lambda x: x[1], reverse=True)[:3]
    print("similar: ", similar_sentences)
    for sentence_df in similar_sentences:
        sentence = sentence_df[0]
        price_df = lower_df[lower_df['title'] == sentence.lower()]

        if price_df.empty == True:
            continue
        price = price_df['price'].values
        for p in price:
            prices.append((sentence, p))
    return prices

def on_snapshot(doc_snapshot, changes, read_time):
    for change in changes:
        if change.type.name == 'ADDED':
            doc_id = change.document.id

            # 새로 추가된 문서 가져오기
            new_doc_ref = db.collection('recommendPrice').document(doc_id)
            new_doc = new_doc_ref.get()
            if new_doc.exists:
                category = new_doc.to_dict().get("category")
                title = new_doc.to_dict().get("title")

                if category and title:
                    print(f'새로운 문서 추가. category: {category} title: {title}\n')
                    recommendPrices = search_similar(title, category)

                    if len(recommendPrices) > 0:
                        maxPrice = max(recommendPrices, key=lambda x: x[1])[1]
                        minPrice = min(recommendPrices, key=lambda x: x[1])[1]
                        for title, price in recommendPrices:
                          if price == maxPrice:
                            maxTitle = title
                          if price == minPrice:
                            minTitle = title
                        print("max min: ", maxPrice, minPrice)
                        print("max min: ", maxTitle, minTitle)

                        # 파이어스토어에 추천 가격 수정
                        new_doc_ref.update({"recommendMaxPrice": int(maxPrice), "recommendMaxTitle": maxTitle, "recommendMinPrice": int(minPrice),  "recommendMinTitle": minTitle})
                        print("upate Firebase!\n")
doc_watch = db.collection(u'recommendPrice').on_snapshot(on_snapshot)

# 서버가 종료되지 않도록 무한루프를 실행
while True:
    time.sleep(0.5)
