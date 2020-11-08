import sys, yaml
from string import Template
from copy import deepcopy


class Renderer:
    CLIENT_FILES = 'client_files'
    SERVER_FILES = 'server_files'
    LOCAL_DOCKER_FILES = 'local_docker_files'

    def __init__(self):
        self.project_name, self.be_project_name = sys.argv[1], sys.argv[2]

    def __create_file(self, path, data):
        with open(path, 'w') as file:
            file.write(data)

    def __get_output_path(self, group, entry):
        path = entry["output_path"]
        if group == self.CLIENT_FILES:
            return f'boilerplate_tmp/{path}'
        if group == self.SERVER_FILES:
            return f'boilerplate_tmp/{path}'.replace(
                '$BE_PROJECT_NAME', self.be_project_name
            )
        return f'{self.project_name}/{path}'

    def render(self):
        for group, file_list in self.files.items():
            for _, entry in file_list.items():
                template_file_name = entry["template"]
                with open(f'templates/{template_file_name}', 'r+') as file:
                    template = Template(file.read())

                    # Extend defined attributes with base settings
                    attributes = deepcopy(self.settings)
                    attributes.update(entry.get("attributes", {}))

                    # Generate outcome
                    outcome = template.substitute(attributes)
                    self.__create_file(
                        self.__get_output_path(group, entry), outcome
                    )

    def load_settings(self, filename='settings.yml'):
        with open(filename, 'r') as file:
            _settings = yaml.load(file.read(), Loader=yaml.Loader)
            self.settings = _settings.get("settings", {})
            self.settings.update({
                'PROJECT_NAME': self.project_name,
                'PROJECT_NAME__LOWERCASE': self.project_name.lower(),
                'BE_PROJECT_NAME': self.be_project_name
            })
            self.files = _settings.get("files", {})


if __name__ == "__main__":
    r = Renderer()
    r.load_settings()
    r.render()
