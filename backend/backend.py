#!/usr/bin/env python3
##

import sys
import random
import time
import datetime
import pymongo
from flask import Flask
from flask import jsonify
from bson import json_util
import json
import yaml

app = Flask(__name__)


with open("config.yml", "r") as ymlfile:
    cfg = yaml.safe_load(ymlfile)
    conn_string= cfg["DATABASE"]["CONNECTION_STRING"]
    db= cfg["DATABASE"]["DB"]
    collection=cfg["DATABASE"]["COLLECTION"]
    
    connection = pymongo.MongoClient(conn_string)
    db = connection[db]
    collection = db[collection]


@app.route('/')
def home():
    return 'Hello World'

@app.route('/read', methods = ['GET'])
def perform_reads():
    restaurant_record=collection.find_one({},{"_id":0})
    print(restaurant_record)
    return restaurant_record

@app.route('/insert', methods = ['GET'])
def perform_inserts():
    collection.insert_one(
            {
            "address": {
            "building": "998814",
            "coord": [-73.74438599999999, 40.72918],
            "street": "Springfield Blvd",
            "zipcode": "11427"
        },
        "borough": "Queens",
        "cuisine": "Hamburgers",
        "grade": "Not Yet Graded",
        "score": 20
    })
    return 'true'

@app.route('/search', methods = ['GET'])
def search():

    pipeline = [
    {
      "$search": {
        'text': {
                'query': "Hamburgers",
                'path': "cuisine"
            }
        },
    },
    {
        "$project": {
        "_id": 0
        }
    },
    ]


    json_docs = []

    search_record=collection.aggregate(pipeline)
    print(search_record)
    for doc in search_record:
        json_doc = json.dumps(doc, default=json_util.default)
        json_docs.append(json_doc)
    return json_doc

if __name__ == '__main__':
     app.run(host='0.0.0.0')