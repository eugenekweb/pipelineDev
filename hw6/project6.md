## Практическое задание по Ansible.

**Отчет по автоматизированному развертыванию Nginx + Apache при помощи СУК Ansible**

### 1. Установите Ansible на локальную машину.

(Ansible ставил внутри виртуального окружения Python;  
В качестве удаленного сервера – ВМ в докере[Ubuntu 20, Python 3.12, OpenSSH])

![](images/image001.png)

![](images/image002.png)

### 2. Подготовьте инвентарный файл для указания IP-адресов удаленных серверов.

![](images/image003.png)

![](images/image004.png)

### 3. Создайте роли Ansible для установки и настройки:

![](images/image005.png)

![](images/image006.png)

### 4. Nginx

![](images/image007.png)

![](images/image008.png)

### 5. Аpache

![](images/image009.png)

![](images/image010.png)

![](images/image011.png)

### 6. Напишите плейбук, который использует созданные роли для развертывания Nginx и Apache на удаленных серверах.

![](images/image012.png)

### 7. Выполните плейбук. Убедитесь, что сервисы запущены и работают корректно.

![](images/image013.png)

![](images/image014.png)

### 8. Проверьте работоспособность развернутых сервисов с помощью браузера или командной строки.

![](images/image015.png)

![](images/image016.png)

![](images/image017.png)

![](images/image018.png)
