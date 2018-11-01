class ClientHandler:
    def __init__(self):
        self.main_user_list = []
        self.end_user_list = []
    
    def addMainUser(self, client):
        self.main_user_list.append(client)
        print(self.main_user_list)
    
    def addEndUser(self, client):
        self.end_user_list.append(client)
        print(self.end_user_list)

    def removeMainUser(self, client):
        self.main_user_list.remove(client)

    def removeEndUser(self, client):
        self.end_user_list.remove(client)
        