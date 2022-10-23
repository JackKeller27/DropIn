class User:
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.pins = []
    def set_username(self, username):
        self.username  = username
    def set_password(self, password):
        self.password = password
    def parse_json_to_user(self, jsonDoc):
        for key in jsonDoc:
            if key == "Username":
                self.username = jsonDoc[key]
            if key == "Password":
                self.password = jsonDoc[key]
        return self.create_document_entry()
    def parse_json_to_user_login(self, jsonDoc):
        for key in jsonDoc:
            if key == "Username":
                self.username = jsonDoc[key]
            if key == "Password":
                self.password = jsonDoc[key]
        return self.create_document_entry_login()
    def create_document_entry(self):
        userStruct = {} 
        userStruct['Username'] = self.username["username"]
        userStruct['Password'] = self.password["password"]    
        userStruct['Pins'] = self.pins
        return userStruct
    def create_document_entry_login(self):
        userStruct = {} 
        userStruct['Username'] = self.username
        userStruct['Password'] = self.password    
        userStruct['Pins'] = self.pins
        return userStruct
    def create_login_query(self):
        query = {"Username": self.username, "Password": self.password}
        return query 
    def create_location_query(self):
        query = {"Username": self.username}
        return query 

class PinLocation: 
    def __init__(self, latitude, longitude, user):
        self.latitude = latitude
        self.longitude = longitude
        self.user = user
    def set_user(self, user):
        self.user = user
    def set_latitude(self, latitude):
        self.latitude = latitude
    def set_longitude(self, longitude):
        self.longitude = longitude
    def get_user(self):
        return self.user
    def parse_json_to_location(self, jsonDoc):
        for key in jsonDoc:
            if key == "Latitude":
                self.latitude = jsonDoc[key]
            if key == "Longitude":
                self.longitude = jsonDoc[key]
        return self.create_document_entry()
    def create_document_entry(self): 
        document = {}
        document['Location'] = {"Latitude" : self.latitude, "Longitude" : self.longitude}
        return document

    