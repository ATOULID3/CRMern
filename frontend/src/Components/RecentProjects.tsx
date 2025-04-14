const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      status: 'In progress',
      team: ['JD', 'SW', 'AJ'],
      progress: 70,
      dueDate: 'May 15, 2023',
    },
    {
      id: 2,
      name: 'Mobile App',
      status: 'Completed',
      team: ['JD', 'JS'],
      progress: 100,
      dueDate: 'Apr 28, 2023',
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      status: 'Delayed',
      team: ['JS', 'SW'],
      progress: 30,
      dueDate: 'Jun 1, 2023',
    },
  ];
  
  const RecentProjects = () => {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Projects</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {projects.map((project) => (
            <div key={project.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                  <div className="mt-1 text-sm text-gray-500">{project.status}</div>
                </div>
                <div className="flex items-center space-x-2">
                  {project.team.map((member, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-medium"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      project.progress === 100
                        ? 'bg-green-500'
                        : project.status === 'Delayed'
                        ? 'bg-red-500'
                        : 'bg-primary-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">Due {project.dueDate}</div>
            </div>
          ))}
        </div>
        <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
          <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View all projects
          </a>
        </div>
      </div>
    );
  };
  
  export default RecentProjects;