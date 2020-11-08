# Variables
PROJECT_NAME=$1
BE_PROJECT_NAME=$2
PROJECT_DIR=${PWD}/$PROJECT_NAME
VENV_NAME=$PROJECT_NAME-boilerplate-venv
TMP_DIR=boilerplate_tmp
CLIENT_DIR=client

echo "📝 Creating new '$PROJECT_NAME' project..."
mkdir $PROJECT_DIR
mkdir $TMP_DIR

python3 -m venv $VENV_NAME

# shellcheck disable=SC1090
source "${VENV_NAME}/bin/activate"

python3 -m pip install -r requirements.txt --quiet

cd $TMP_DIR || return
django-admin startproject $BE_PROJECT_NAME
# Development virtualenv
python3 -m virtualenv $BE_PROJECT_NAME/venv
cd ..

#DJANGO_VERSION=${python3 -m django --version}
echo "🐍 BE ready using Django"

# Copy to temporary dir until Renderer is not finished
cp -r client $TMP_DIR/$CLIENT_DIR
echo "🚀 FE ready using React"

mkdir $PROJECT_DIR/local-docker
python3 main.py $PROJECT_NAME $BE_PROJECT_NAME
echo "🐳 Docker ready"

# Copy to final destination
cp -r $TMP_DIR/$CLIENT_DIR $PROJECT_DIR/$CLIENT_DIR
cp -r $TMP_DIR/$BE_PROJECT_NAME $PROJECT_DIR/$BE_PROJECT_NAME

deactivate
rm -rf $VENV_NAME
rm -rf $TMP_DIR
echo "🎉 $PROJECT_NAME created"