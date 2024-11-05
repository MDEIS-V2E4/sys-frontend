pipeline {
    agent any

    parameters {
        string(name: 'GITHUB_URL', defaultValue: 'https://github.com/enunez-dev/sys-frontend.git', description: 'GitHub URL project')
        string(name: 'GITHUB_BRANCH', defaultValue: 'master', description: 'Branch to deploy from')
        string(name: 'NGINX_EXECUTABLE_PATH', defaultValue: 'C:\\nginx\\nginx.exe', description: 'Set the path to Nginx executable')
        string(name: 'NGINX_BASE_PATH', defaultValue: 'C:\\nginx\\', description: 'Set the path to Nginx base')
        string(name: 'HTML_PATH', defaultValue: 'C:\\nginx\\html\\sys-frontend', description: 'Set destination for frontend files')
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
                        bat "\"${params.NGINX_EXECUTABLE_PATH}\" -p ${params.NGINX_BASE_PATH} -s stop"
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
                    bat "xcopy /E /I /Y \"${workspacePath}\" \"${params.HTML_PATH}\""
                }
            }
        }

        stage('Up server nginx') {
            steps {
                script {
                    withEnv(['JENKINS_NODE_COOKIE=do_not_kill']) {
                        bat "start /B cmd /c \"${params.NGINX_EXECUTABLE_PATH}\" -p ${params.NGINX_BASE_PATH}"
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
