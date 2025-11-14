  import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
  import { attendanceRecords } from './attendances-records.table';
  import { user } from './auth.table';

  export const userAttendance = pgTable('user_attendance', {
    id: uuid('id').notNull().primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    attendanceId: uuid('attendance_id')
      .notNull()
      .references(() => attendanceRecords.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  });
