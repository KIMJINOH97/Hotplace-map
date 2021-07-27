from instagram_DML import InstaUpdateManager

if __name__ == '__main__':
    instagramManager = InstaUpdateManager()
    instagramManager.update_instagram()
    instagramManager.con.close()