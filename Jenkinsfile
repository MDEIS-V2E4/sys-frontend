pipeline {
    agent any

    environment {
        PORT = '3000'
        VITE_BASE_URL = 'http://localhost:3050/api'
        PM2_HOME = 'C:\\tools\\.pm2'
        NGINX_PATH = 'C:\\nginx\\nginx.exe' // Set the path to Nginx executable
        HTML_PATH = 'C:\\nginx\\html\\sys-frontend' // Set destination for frontend files
    }

    parameters {
        string(name: 'GITHUB_URL', defaultValue: 'https://github.com/enunez-dev/sys-frontend.git', description: 'GitHub URL project')
        string(name: 'GITHUB_BRANCH', defaultValue: 'master', description: 'Branch to deploy from')
    }

    stages {
        stage('Checkout') {
            steps {
                git(branch: "${params.GITHUB_BRANCH}", url: "${params.GITHUB_URL}")
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
                    // Check if Nginx is running, then stop it if it is
                    def isRunning = bat(script: 'tasklist | findstr /I nginx.exe', returnStatus: true) == 0
                    if (isRunning) {
                        echo 'Nginx is running; stopping the service for app update.'
                        bat "\"${env.NGINX_PATH}\" -p F:\\nginx\\ -s stop"
                        sleep 2
                    } else {
                        echo 'Nginx is not running; proceeding with app update.'
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
                script {
                    def workspacePath = "${env.WORKSPACE}\\dist"
                    bat "xcopy /E /I /Y \"${workspacePath}\" \"${env.HTML_PATH}\""
                }
            }
        }

        stage('Up server nginx') {
            steps {
                script {
                    withEnv(['JENKINS_NODE_COOKIE=do_not_kill']) {
                        bat "start /B cmd /c \"${env.NGINX_PATH}\" -p F:\\nginx\\"
                        echo 'Nginx is now running after app update.'
                        sleep 2
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Frontend deployment process completed.'            
        }
        failure {
            echo 'Deployment failed, please check the logs for more details.'
        }
    }
}
