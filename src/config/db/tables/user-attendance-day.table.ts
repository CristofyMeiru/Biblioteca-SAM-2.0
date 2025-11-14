import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth.table';

export const weekDayEnum = pgEnum('week_day', [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]);

export const userAttendanceDay = pgTable('user_attendance_day', {
  id: uuid('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  weekDay: weekDayEnum('week_day').notNull(),
});
