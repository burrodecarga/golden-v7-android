import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';
import { Todo } from '@/types/todo';

export const getDefaultCalendarSource = async () => {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
};

export const getCalendarPermission = async (): Promise<boolean> => {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  return status === 'granted';
};

export const createCalendar = async (): Promise<string> => {
  try {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Todo Reminders' };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Todo Reminders',
      color: '#5B7FFF',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'todoreminders',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    
    return newCalendarID;
  } catch (error) {
    console.error('Failed to create calendar', error);
    throw error;
  }
};

export const getOrCreateCalendar = async (): Promise<string> => {
  try {
    const hasPermission = await getCalendarPermission();
    if (!hasPermission) {
      throw new Error('Calendar permission not granted');
    }
    
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const todoCalendar = calendars.find(cal => cal.name === 'todoreminders');
    
    if (todoCalendar) {
      return todoCalendar.id;
    }
    
    return await createCalendar();
  } catch (error) {
    console.error('Failed to get or create calendar', error);
    throw error;
  }
};

export const createReminderEvent = async (todo: Todo): Promise<string> => {
  try {
    if (!todo.dueDate) {
      throw new Error('Todo must have a due date to create a reminder');
    }
    
    const calendarId = await getOrCreateCalendar();
    const dueDate = new Date(todo.dueDate);
    
    // Create an event 30 minutes before the due date
    const reminderDate = new Date(dueDate);
    reminderDate.setMinutes(reminderDate.getMinutes() - 30);
    
    const eventId = await Calendar.createEventAsync(calendarId, {
      title: todo.title,
      notes: todo.description || 'Todo reminder',
      startDate: reminderDate,
      endDate: dueDate,
      alarms: [{ relativeOffset: -15 }], // Reminder 15 minutes before
    });
    
    return eventId;
  } catch (error) {
    console.error('Failed to create reminder event', error);
    throw error;
  }
};

export const updateReminderEvent = async (todo: Todo): Promise<string> => {
  try {
    if (!todo.dueDate) {
      throw new Error('Todo must have a due date to update a reminder');
    }
    
    if (todo.reminderEventId) {
      // Delete the old event
      await Calendar.deleteEventAsync(todo.reminderEventId);
    }
    
    // Create a new event
    return await createReminderEvent(todo);
  } catch (error) {
    console.error('Failed to update reminder event', error);
    throw error;
  }
};

export const deleteReminderEvent = async (eventId: string): Promise<void> => {
  try {
    if (!eventId) return;
    
    await Calendar.deleteEventAsync(eventId);
  } catch (error) {
    console.error('Failed to delete reminder event', error);
    throw error;
  }
};