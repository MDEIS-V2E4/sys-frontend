pipeline {
    agent any

<<<<<<< HEAD
    parameters {
        string(name: 'GITHUB_URL', defaultValue: 'https://github.com/enunez-dev/sys-frontend.git', description: 'GitHub URL project')
        string(name: 'GITHUB_BRANCH', defaultValue: 'master', description: 'Branch to deploy from')
        string(name: 'NGINX_EXECUTABLE_PATH', defaultValue: 'C:\\nginx\\nginx.exe', description: 'Set the path to Nginx executable')
        string(name: 'NGINX_BASE_PATH', defaultValue: 'C:\\nginx\\', description: 'Set the path to Nginx base')
        string(name: 'HTML_PATH', defaultValue: 'C:\\nginx\\html\\sys-frontend', description: 'Set destination for frontend files')
=======
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
>>>>>>> 5dfba3a6095619c179464275e8ca08449b63c1ea
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
<<<<<<< HEAD
                        bat "\"${params.NGINX_EXECUTABLE_PATH}\" -p ${params.NGINX_BASE_PATH} -s stop"
=======
                        bat "\"${env.NGINX_PATH}\" -p C:\\nginx\\ -s stop"
>>>>>>> 5dfba3a6095619c179464275e8ca08449b63c1ea
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
<<<<<<< HEAD
                    bat "xcopy /E /I /Y \"${workspacePath}\" \"${params.HTML_PATH}\""
=======
                    bat "xcopy /E /I /Y \"${workspacePath}\" \"${env.HTML_PATH}\""
>>>>>>> 5dfba3a6095619c179464275e8ca08449b63c1ea
                }
            }
        }

        stage('Up server nginx') {
            steps {
                script {
                    withEnv(['JENKINS_NODE_COOKIE=do_not_kill']) {
<<<<<<< HEAD
                        bat "start /B cmd /c \"${params.NGINX_EXECUTABLE_PATH}\" -p ${params.NGINX_BASE_PATH}"
=======
                        bat "start /B cmd /c \"${env.NGINX_PATH}\" -p C:\\nginx\\"
>>>>>>> 5dfba3a6095619c179464275e8ca08449b63c1ea
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
