export const appKey = 'clrt-admin';

export enum PageContenEnum {
  LIST = 'list',
  SHOW = 'show',
  EDIT = 'edit',
  ADD = 'add',
}

export enum DictionaryTypeEnum {
  CAR_PART_STOCK = 'car_parts_stock',
  EVENT_CHAMPIONSHIP = 'event_championship',
  EVENT_STATUS = 'event_status',
  EVENT_TYPE = 'event_type',
  MAINTENANCE_STATUS = 'maintenance_status',
  TASK_LINK_TYPE = 'task_link_type',
  TASK_STATUS = 'task_status',
  TASK_TYPE = 'task_type',
  USER_LANGUAGE = 'user_language',
  CAR_PART_STATUS = 'car_part_status',
}

type IObjectType = {
  [key: string]: string;
};

export const showContentTitles: IObjectType = {
  organizations: 'Organization Details',
  tasks: 'Task Details',
  cars: 'Car Details',
  'car-parts': 'Car Part Details',
  users: 'User Details',
  dictionaries: 'Dictionaries Details',
  events: 'Event Details',
  maintenance: 'Maintenance Details',
  'task-templates': 'Task Template Details',
};

export const addEditContentTitles: IObjectType = {
  organizations: 'Organization',
  tasks: 'Task',
  cars: 'Car',
  'car-parts': 'Car Part',
  users: 'User',
  dictionaries: 'Dictionaries',
  events: 'Event',
  maintenance: 'Maintenance',
  'task-templates': 'Task Template',
};
