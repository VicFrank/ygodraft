# https://yugipedia.com/wiki/Portal:Yu-Gi-Oh!_Master_Duel_sets
# Parse the page, go to each link under secret packs, and get the list of cards, as well
# as the image of the pack, then output to a json file

import requests
import json
import time
from bs4 import BeautifulSoup

BASE_URL = "https://yugipedia.com"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def getSecretPacks():
  res = []
  req = requests.get(BASE_URL + "/wiki/Portal:Yu-Gi-Oh!_Master_Duel_sets", headers=HEADERS)

  if req.status_code == 200:
    soup = BeautifulSoup(req.content, 'html.parser')
    secretPacks = soup.find_all('span', {'id': 'Secret_Packs'})[0].parent.find_next('ul').find_all('li')


    for pack in secretPacks:
      packData = {}
      print('Pack {} out of {}'.format(secretPacks.index(pack) + 1, len(secretPacks)))

      image_link = pack.find('a')

      srcset =  image_link.find('img')['srcset']
      image_url = srcset.split(' ')[0]

      # get the second a tag, which is the link to the pack
      secondLink = pack.find_all('a')[1]
      packURL = BASE_URL + secondLink['href']
      packTitle = secondLink['title']
      packReq = requests.get(packURL, headers=HEADERS)

      packData["name"] = packTitle
      packData["image"] = image_url
      packData["cards"] = []

      time.sleep(0.5)

      if packReq.status_code == 200:
        packSoup = BeautifulSoup(packReq.content, 'html.parser')
        cards = packSoup.find_all('table', {'class': 'wikitable'})[0].find_all('tr')[1:]

        for card in cards:
          cardName = card.find_all('td')[0].text
          # strip the start and end quotes from the card name
          cardName = cardName[1:-1]
          packData['cards'].append(cardName)
      else:
        print('ERROR: {} on route {}'.format(packReq.status_code, packURL))

      res.append(packData)
  else:
    print('ERROR: {} on route {}'.format(req.status_code, BASE_URL))

  return res

output = getSecretPacks()

# write the output to a .json file (in this directory)
with open('secretPacks.json', 'w') as f:
  json.dump(output, f, indent=2)