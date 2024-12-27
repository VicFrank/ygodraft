# API can be found at https://db.ygoprodeck.com/api-guide/
# Note there is a limit of 20 requests/second

import os

import requests
import json
import time

BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes"
REQUESTS_PER_SECOND = 10
BASE_DIR = "client/src/assets/images"
CARDS_DIR = BASE_DIR + "/cards"
CARDS_SMALL_DIR = BASE_DIR + "/cards_small"
CARDS_CROPPED_DIR = BASE_DIR + "/cards_cropped"

def downloadCardImage(url, id, dir):
  filename = dir + "/" + str(id) + ".jpg"

  # if os.path.exists(filename):
  #   return

  time.sleep(1/REQUESTS_PER_SECOND)
  req = requests.get(url)

  if req.status_code == 200:
    f = open(filename, 'wb')
    f.write(req.content)
    f.close()
  else:
    print('ERROR: {} on route {}'.format(req.status_code, url))

def getAllCardsData():
  req = requests.get(BASE_URL)

  if not os.path.exists(CARDS_DIR):
    os.makedirs(CARDS_DIR)
  if not os.path.exists(CARDS_SMALL_DIR):
    os.makedirs(CARDS_SMALL_DIR)
  if not os.path.exists(CARDS_CROPPED_DIR):
    os.makedirs(CARDS_CROPPED_DIR)

  if req.status_code == 200:
    cardsData = json.loads(req.content)['data']

    count = 0

    for card in cardsData:
      for cardImage in card['card_images']:
        cardID = cardImage['id']
        url = cardImage['image_url']
        urlSmall = cardImage['image_url_small']
        urlCropped = cardImage['image_url_cropped']

        downloadCardImage(url, cardID, CARDS_DIR)
        downloadCardImage(urlSmall, cardID, CARDS_SMALL_DIR)
        downloadCardImage(urlCropped, cardID, CARDS_CROPPED_DIR)

        count += 1
        if count % 100 == 0:
          print(count)
  else:
    print('ERROR: {} on route {}'.format(req.status_code, BASE_URL))


getAllCardsData()