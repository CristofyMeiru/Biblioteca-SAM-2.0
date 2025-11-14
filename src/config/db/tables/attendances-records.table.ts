import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { weekDayEnum } from './user-attendance-day.table';

export const attendanceRecords = pgTable('attendance_records', {
  id: uuid('id').notNull().primaryKey(),
  weekDay: weekDayEnum('week_day').notNull(),
  date: timestamp('date').notNull(),
});
