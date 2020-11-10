# Variables
PROJECT_NAME=$1
BE_PROJECT_NAME=$(echo "$PROJECT_NAME"_be | tr '[:upper:]' '[:lower:]')
PROJECT_DIR=$(PWD)/$PROJECT_NAME
TMPDIR=$(PWD)/boilerplate_tmp
BASEDIR=$(dirname "$0")
PARENTDIR=$(dirname "$BASEDIR")
VENV_NAME=$PROJECT_NAME-boilerplate-venv
CLIENT_DIR=client

echo "📝 Creating new '$PROJECT_NAME' project..."
mkdir $PROJECT_DIR
mkdir $TMPDIR

python3 -m venv $VENV_NAME

# shellcheck disable=SC1090
source "${VENV_NAME}/bin/activate"

python3 -m pip install Django PyYAML virtualenv --quiet

cd $TMPDIR || return
django-admin startproject $BE_PROJECT_NAME
# Development virtualenv
python3 -m virtualenv $BE_PROJECT_NAME/venv
cd ..

#DJANGO_VERSION=${python3 -m django --version}
echo "🐍 BE ready using Django"

# Copy to temporary dir until Renderer is not finished
cp -r $PARENTDIR/client $TMPDIR/$CLIENT_DIR
echo "🚀 FE ready using React"

mkdir $PROJECT_DIR/local-docker
python3 $PARENTDIR/main.py $PROJECT_NAME $BE_PROJECT_NAME
echo "🐳 Docker ready"

# Copy to final destination
cp -r $TMPDIR/$CLIENT_DIR $PROJECT_DIR/$CLIENT_DIR
cp -r $TMPDIR/$BE_PROJECT_NAME $PROJECT_DIR/$BE_PROJECT_NAME

deactivate
rm -rf $VENV_NAME
rm -rf $TMPDIR
echo "🎉 $PROJECT_NAME created"