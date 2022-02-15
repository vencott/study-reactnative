# 16 Publishing the App

- Android Studio나 Xcode를 사용하지 않고 expo의 CLI를 사용해서 빌드한다


## update over the air
`expo build:android|ba`

- 이 작업은 맨 처음 한번만 해주면 되며, 후에 코드를 수정하고 publish/republish만 하면 expo 서버에 이를 올리게 되고, 앱스토어/구글플레이스토어는 이 expo 서버의 코드를 가져와 자동으로 반영한다 
- 실제로 빌드하는 것은 expo client이며 이 client는 expo 서버에서 항상 최신의 코드를 불러와 실행한다