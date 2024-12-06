## Как подготовить среду и запустить проект

#### 1. Соберите docker-image для тестовой машины и запустите контейнер

-   сгенерируйте SSH-ключи, если ранее этого не сделали
-   установите docker
-   **в папке hw6 должен присутствовать ваш публичный ключ** (в примере - **id_ed25519.pub**)
-   если ваш ключ имеет другое имя - измените в соответствии с этим именем файл hw6/Dockerfile
-   находясь в папке hw6 запустите создание image

```
docker build -t <image-name> .
```

_где image-name - имя вашего docker-образа_

-   создайте и запустите ваш контейнер

```
docker run -d -p 8080:80 -p 8088:88 -p 2222:22 --name <container-name> <image-name>
```

#### 2. Создайте виртуальное окружение, установите зависимости

-   убедитесь, что у вас установлен Python версии выше 3.8, а также pip

-   находясь в папке ansible-hw выполните:

```
python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

-   проверьте, что установился ansible и необходимые зависимости:

```
ansible --version
```

#### 3. Проверьте/установите роли и запустите playbook

-   убедитесь, что ansible видит роли. В папке ansible-hw запустите:

```
ansible-galaxy role list
```

-   если отображаются роли nginx и apache - всё ок. Если нет, выполните:

```
cd roles/

ansible-galaxy role init nginx

ansible-galaxy role init apache
```

-   проверьте, если файлы внутри ролей перетерлись - замените их файлами из репозитория

-   всё готово к запуску playbook. Из папки ansible-hw - Поехали!

```
ansible-playbook -i inventory/hosts.yml playbooks/webservers.yml
```
