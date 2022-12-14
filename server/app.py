from flask import Flask, request, jsonify
import objects as obj
from pymongo import MongoClient
import os

LOCAL_SECRET  = os.getenv('LOCAL_SECRET')
client = MongoClient('mongodb+srv://admin:admin@skatecluster.r8rwk1y.mongodb.net/?retryWrites=true&w=majority')
db = client["skate"]
collection = db["skate"]
geo_collection = db["geodata"]

app = Flask(__name__)
app.secret_key = LOCAL_SECRET

@app.route('/signup', methods=['POST'])
def signup():
    requestContents = {}
    requestContents = request.get_json()
    if requestContents:
        userObj = obj.User("", "")
        document = userObj.parse_json_to_user(requestContents)
        collection.insert_one(document)
    else:
        print("error parsing json")
    return "User added"
@app.route('/login', methods=['POST'])
def login():
    requestContents = {}
    requestContents = request.get_json()
    if requestContents:
        requestContents["Username"] = requestContents["Username"]["username"]
        requestContents["Password"] = requestContents["Password"]["password"]
        userObj = obj.User("", "")
        document = userObj.parse_json_to_user_login(requestContents)
        query_login = userObj.create_login_query()
        result = collection.find_one(query_login)
        print(requestContents)
        if result:
            resDict = {"Value" : "True"}
            return resDict
        else:
            resDict = {"Value" : "False"}
            return resDict
    else:
        print("error parsing json")
    return " "
@app.route('/pushpin', methods=['POST'])
def pushpin():
    requestContents = {}
    requestContents = request.get_json()
    if requestContents:
        locationObj = obj.PinLocation("", "", "")   
        document = locationObj.parse_json_to_location(requestContents)
        geo_collection.insert_one(document)
    else:
        print("error parsing json")
        return "error"
    return "Location added" 
@app.route('/getpins', methods=['GET'])
def getpins(): 
    responseContents = {} 
    responseContents['Pins'] = []
    cursor = geo_collection.find({}, {'_id': False})
    for item in cursor:
        responseContents['Pins'].append(item)
    return jsonify(responseContents)
if __name__ == '__main__':
    app.run(threaded=True, port=33507)
