pipeline {
    agent any

    environment {
        PORT = '3000'
        VITE_BASE_URL = 'http://localhost:3050/api'
        PM2_HOME = 'C:\\tools\\.pm2'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/enunez-dev/sys-frontend.git', branch: 'master'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Down Service Nginx') {
            steps {
                script {
                    String nginxPathExecutable = "C:\\nginx\\nginx.exe"
                    bat "\"${nginxPathExecutable}\" -v"
                    
                    def isRunning = bat(script: 'tasklist | findstr /I nginx.exe', returnStatus: true) == 0
                    if (isRunning) {
                        echo 'Nginx esta corriendo, se bajara el servicio para actualizar app.'
                        bat "\"${nginxPathExecutable}\" -p C:\\nginx\\ -s stop"
                        sleep 2
                    } else {
                        echo 'Nginx no esta corriendo, se procede a actualizar la app.'
                    }
                }
            }
        }
        stage('Build with Vite') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Copy build to server') {
            steps {
                script{
                    def workspacePath = "${env.WORKSPACE}\\dist"
                    bat "xcopy /E /I /Y ${workspacePath} \"C:\\nginx\\html\\sys-frontend\""
                }    
            }
        }
        stage('Up server nginx') {
            steps {
                script{
                    withEnv ( ['JENKINS_NODE_COOKIE=do_not_kill'] ) {
                        String nginxPathExecutable = "C:\\nginx\\nginx.exe"
                        bat "start /B cmd /c \"${nginxPathExecutable}\" -p C:\\nginx\\"
                        echo 'Nginx corriendo, se sube el servicio.'
                        sleep 2
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Proceso de despliegue del frontend completado.'            
        }
        failure {
            echo 'El despliegue falló, revisa los logs para más detalles.'
        }
    }
}