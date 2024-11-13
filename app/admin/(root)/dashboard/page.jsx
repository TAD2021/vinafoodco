'use client';

import { Announcements } from '@/components/admin/dashboard/Annoucements';
import { LatestTransactions } from '@/components/admin/dashboard/LatestTransactions';
import { StatsCard } from '@/components/admin/dashboard/StatsCard';
import { WeeklyRecap } from '@/components/admin/dashboard/WeeklyRecap';
import { Fragment } from 'react';

export default function Dashboard() {
  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Total Users"
          value="10.928"
          change="12% more than previous week"
        />
        <StatsCard
          title="Total Users"
          value="10.928"
          change="12% more than previous week"
        />
        <StatsCard
          title="Total Users"
          value="10.928"
          change="12% more than previous week"
        />
      </div>
      <LatestTransactions />
      <Announcements />
      <WeeklyRecap />
    </Fragment>
  );
}
