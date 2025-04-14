const SettingsPage = () => {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Account Settings</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-900">Notifications</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Configure how you receive notifications.
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">
                        Email notifications
                      </label>
                      <p className="text-gray-500">Get notified via email.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="push-notifications"
                        name="push-notifications"
                        type="checkbox"
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="push-notifications" className="font-medium text-gray-700">
                        Push notifications
                      </label>
                      <p className="text-gray-500">Get notified on your device.</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <div>
                <h4 className="text-md font-medium text-gray-900">Security</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Update your password and secure your account.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SettingsPage;