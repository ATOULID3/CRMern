const activities = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'JD',
      },
      action: 'completed',
      target: 'Project Dashboard',
      time: '2h ago',
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: 'JS',
      },
      action: 'created',
      target: 'New Task',
      time: '4h ago',
    },
    {
      id: 3,
      user: {
        name: 'Alex Johnson',
        avatar: 'AJ',
      },
      action: 'commented',
      target: 'on Project X',
      time: '1d ago',
    },
    {
      id: 4,
      user: {
        name: 'Sarah Williams',
        avatar: 'SW',
      },
      action: 'updated',
      target: 'Profile Settings',
      time: '2d ago',
    },
  ];
  
  const ActivityFeed = () => {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div key={activity.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                  {activity.user.avatar}
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user.name}</span>{' '}
                    {activity.action} {activity.target}
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
          <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View all activity
          </a>
        </div>
      </div>
    );
  };
  
  export default ActivityFeed;