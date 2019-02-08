class ExecutionEngine:
    def __init__(self):
        self.node = []
        self.current = 0
    
    def nextNodeURL(self):
        node = self.node[self.current]
        self.current += 1
        if(Node is not None):
            return node.getURLService()
        return None
