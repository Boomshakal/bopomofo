pipeline {
    agent any
    
    environment {
        REPO_URL    = 'https://github.com/Boomshakal/bopomofo.git'
        BRANCH      = 'master'
        DOCKER_REGISTRY = 'registry.cn-hangzhou.aliyuncs.com'  // 替换为您的Docker镜像仓库地址
        NAMESPACE   = 'registry_own'
        IMAGE_NAME = 'bopomofo'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('准备工作 - 拉取代码') {
            steps {
                script {
                    echo "🚀 正在拉取 GitHub 仓库: ${env.REPO_URL} 的 ${env.BRANCH} 分支..."
                }
                git branch: "${env.BRANCH}", url: "${env.REPO_URL}"
            }
        }
        
        stage('构建Docker镜像') {
            steps {
                script {
                    // 构建Docker镜像
                    sh "docker build -t ${DOCKER_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG} ."
                    // 添加latest标签
                    sh "docker tag ${DOCKER_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:latest"
                }
            }
        }
        
        stage('推送Docker镜像') {
            steps {
                script {
                    // 登录到Docker镜像仓库
                    withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo ${DOCKER_PASSWORD} | docker login ${DOCKER_REGISTRY} -u ${DOCKER_USERNAME} --password-stdin"
                    }
                    
                    // 推送镜像到仓库
                    sh "docker push ${DOCKER_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG}"
                    sh "docker push ${DOCKER_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:latest"
                }
            }
        }
    }
    
    post {
        always {
            // 清理工作区
            cleanWs()
            
            // 清理本地Docker镜像
            script {
                try {
                    sh "docker rmi ${DOCKER_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${IMAGE_TAG} || true"
                    sh "docker rmi ${DOCKER_REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:latest || true"
                } catch (Exception e) {
                    echo "清理Docker镜像失败: ${e.message}"
                }
            }
        }
        success {
            echo '构建成功!'
        }
        failure {
            echo '构建失败!'
        }
    }
}