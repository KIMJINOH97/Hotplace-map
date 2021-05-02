from instagram_DML import InstaUpdateManager

if __name__ == '__main__':
    insta_manager = InstaUpdateManager()
    dong_id = insta_manager.input_dong()
    insta_manager.update_instagram(dong_id)