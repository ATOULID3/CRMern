import { useEffect, useState } from 'react';
import StatCard from '../../components/StatCard';
import ActivityFeed from '../../components/ActivityFeed';
import RecentProjects from '../../components/RecentProjects';
import PerformanceChart from '../../components/PerformanceChart';
import { supabase } from '../../utils/supabase';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0,
    members: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Simulate fetching data from Supabase
      setStats({
        projects: 12,
        tasks: 34,
        completed: 28,
        members: 5,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value={stats.projects} change="+12%" />
        <StatCard title="Tasks" value={stats.tasks} change="+5%" />
        <StatCard title="Completed" value={stats.completed} change="+20%" />
        <StatCard title="Team Members" value={stats.members} change="+2" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>

      <div>
        <RecentProjects />
      </div>
    </div>
  );
};

export default DashboardHome;