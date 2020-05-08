#Prashant Mali
## Required installation libraries & packages
Python 3.7.6
Flask - above 1.0 version
Postgres - 11G
Reactjs(16.9.0)

## How to start application:
    ## Frontend

        yarn
        yarn start

        or 
        npm install
        npm start


    ## Backend

        First you need to setup on your local machine.
        Go to API folder - 
        after that install all the python dependencies using pip command.

        command - pip install -r requirements.txt
        setup database -

        python manage.py db init
        python manage.py db migrate
        python manage.py db upgrade

        Start the server -
        python manage.py runserver


        Go to following path -
        http://localhost:9200/api/

        --- return all the todo task list.


    ## Database:

        Database name is todo
        Using PG admin you can check table & their records.

  
Runs the app in the development mode.<br>

For React -
http://localhost:3000

For Python -
http://localhost:9200/api/


