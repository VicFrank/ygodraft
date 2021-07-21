# API can be found at https://db.ygoprodeck.com/api-guide/
# Note there is a limit of 20 requests/second

import os

import requests
import json
import time

BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
IMAGE_DIR = "cards"
REQUESTS_PER_SECOND = 10

def writeImageToFile(image, name):
  filename = IMAGE_DIR + "/" + name + ".jpg"
  f = open(filename, 'wb')
  f.write(image)
  f.close()

def downloadCardImage(url, id):
  req = requests.get(url)

  if req.status_code == 200:
    writeImageToFile(req.content, str(id))
  else:
    print('ERROR: {} on route {}'.format(req.status_code, url))

def getAllCardsData():
  req = requests.get(BASE_URL)

  if req.status_code == 200:
    cardsData = json.loads(req.content)['data']

    count = 0

    for card in cardsData:
      for cardImage in card['card_images']:
        cardID = cardImage['id']
        url = cardImage['image_url']
        urlSmall = cardImage['image_url_small']

        downloadCardImage(url, cardID)

        count += 1
        if count % 100 == 0:
          print(count)

        time.sleep(1/REQUESTS_PER_SECOND)
  else:
    print('ERROR: {} on route {}'.format(req.status_code, BASE_URL))


getAllCardsData()