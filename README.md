# vue-dummy

1) На компьютере должен быть установлен nodeJS - https://nodejs.org/en/
2) Рабочее окружение приложения создается с помощью  https://cli.vuejs.org/#getting-started

Заметка: если у вас уже используется nodeJS, и Вы не хотите 'загрязнять' глобальные пакеты или у Вас могут возникнуть проблемы с совместимостью глобальных пакетов.
        Можно использовать утилиту nvm - Node Version Manager. Она позволяет управлять разными версиями nodeJS на одной машине.
        Установщик для Windows - https://github.com/coreybutler/nvm-windows/releases
        Установка в Unix cистемах - $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
                                    $ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

        В консоли - nvm list available - список доступных для установки версий Node.js,
                    nvm install 16.17.0 - установить nodeJS выбранной версиями
                    nvm list - список установленных версий nodeJS
                    nvm use (версия) - переключить версию nodeJS

3) Перейдите с проектом и выполните npm install - это установит зависимости проекта.
4) Запустить проект - npm run serve

Ниже команды сформированные vueCLI
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
