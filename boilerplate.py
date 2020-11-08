import os, sys


if __name__ == "__main__":
    project_name = sys.argv[1]
    be_project_name = f'{sys.argv[1].lower()}_be'
    os.system(f'./boilerplate.sh {project_name} {be_project_name}')
