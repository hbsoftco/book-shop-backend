pipeline {
    agent any 
        stage("Build Image"){
            steps {
                script {
                    img = 'httpd:2.4-alpine'
                    docker.image("").run('-d -p 8888:80')
                }
            }
        }
    }
}
