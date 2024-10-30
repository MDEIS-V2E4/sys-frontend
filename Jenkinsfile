pipeline {
    agent any

    environment {
        PORT = '3000'
        VITE_BASE_URL = 'http://localhost:3050/api'
        PM2_HOME = 'C:\\tools\\.pm2'
    }
	parameters {
		string(name: 'GITHUB_URL', defaultValue: 'https://github.com/enunez-dev/sys-frontend.git', description: 'GitHub URL project')
        string(name: 'GITHUB_BRANCH', defaultValue: 'master', description: 'Branch to deploy from')
    
	}
    stages {
        stage('Checkout') {
            steps {
                git(branch: "${GITHUB_BRANCH}", url: '${GITHUB_URL}')
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
                    String nginxPathExecutable = "F:\\nginx\\nginx.exe"
                    bat "\"${nginxPathExecutable}\" -v"
                    
					
                    def isRunning = bat(script: 'tasklist | findstr /I nginx.exe', returnStatus: true) == 0
                    if (isRunning) {
                        echo 'Nginx esta corriendo, se bajara el servicio para actualizar app.'
                        bat "\"${nginxPathExecutable}\" -p F:\\nginx\\ -s stop"
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
                    bat "xcopy /E /I /Y ${workspacePath} \"F:\\nginx\\html\\sys-frontend\""
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