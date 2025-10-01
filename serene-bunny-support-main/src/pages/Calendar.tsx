import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Circle, Calendar as CalendarIcon, ListTodo } from 'lucide-react';

type Appointment = {
  id: string;
  title: string;
  date: string; // ISO date (yyyy-mm-dd)
  time?: string; // HH:mm
  notes?: string;
  completed: boolean;
  isTask?: boolean; // Flag to distinguish tasks from appointments
};

type TodoTask = {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
};

const STORAGE_KEY = 'serene_calendar_appointments_v1';
const TASKS_STORAGE_KEY = 'serene_todo_tasks_v1';

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const pad = (n: number) => String(n).padStart(2, '0');
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const isSameDay = (aISO: string, b: Date) => aISO === toISO(b);

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar: React.FC = () => {
  const [current, setCurrent] = useState<Date>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [todoTasks, setTodoTasks] = useState<TodoTask[]>([]);
  const [activeTab, setActiveTab] = useState('calendar');

  // Seed from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setAppointments(JSON.parse(raw));
      } else {
        // Seed with a couple of examples
        const today = new Date();
        const ex: Appointment[] = [
          { id: 'a1', title: 'Counseling Session', date: toISO(today), time: '15:30', notes: 'Room 204', completed: false },
          { id: 'a2', title: 'Follow-up Call', date: toISO(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3)), time: '11:00', completed: true },
        ];
        setAppointments(ex);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ex));
      }

      // Load todo tasks
      const tasksRaw = localStorage.getItem(TASKS_STORAGE_KEY);
      if (tasksRaw) {
        setTodoTasks(JSON.parse(tasksRaw));
      } else {
        // Seed with example tasks
        const today = new Date();
        const exampleTasks: TodoTask[] = [
          { id: 't1', title: 'Morning meditation', date: toISO(today), completed: true, priority: 'medium' },
          { id: 't2', title: 'Study session - Mathematics', date: toISO(today), completed: false, priority: 'high' },
          { id: 't3', title: 'Evening reflection', date: toISO(today), completed: false, priority: 'low' },
        ];
        setTodoTasks(exampleTasks);
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(exampleTasks));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch {}
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(todoTasks));
    } catch {}
  }, [todoTasks]);

  const monthDays = useMemo(() => {
    const start = startOfMonth(current);
    const end = endOfMonth(current);
    const days: Date[] = [];
    for (let d = new Date(start); d <= end; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
      days.push(d);
    }
    return days;
  }, [current]);

  const apptsByDay = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const a of appointments) {
      if (!map.has(a.date)) map.set(a.date, []);
      map.get(a.date)!.push(a);
    }
    return map;
  }, [appointments]);

  const firstWeekday = startOfMonth(current).getDay();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Appointment>>({ title: '', date: toISO(new Date()), time: '', notes: '', completed: false });

  const addAppointment = () => {
    if (!form.title || !form.date) return;
    const newA: Appointment = {
      id: Math.random().toString(36).slice(2),
      title: form.title!,
      date: form.date!,
      time: form.time || '',
      notes: form.notes || '',
      completed: !!form.completed,
    };
    setAppointments((prev) => [...prev, newA]);
    setOpen(false);
    setForm({ title: '', date: toISO(new Date()), time: '', notes: '', completed: false });
  };

  const toggleCompleted = (id: string) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a)));
  };

  const remove = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  // Task management functions
  const addTask = (title: string, date: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTask: TodoTask = {
      id: Math.random().toString(36).slice(2),
      title,
      date,
      completed: false,
      priority
    };
    setTodoTasks((prev) => [...prev, newTask]);
  };

  const toggleTaskCompleted = (id: string) => {
    setTodoTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const removeTask = (id: string) => {
    setTodoTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const convertTaskToAppointment = (task: TodoTask) => {
    const appointment: Appointment = {
      id: task.id,
      title: task.title,
      date: task.date,
      completed: task.completed,
      isTask: true
    };
    setAppointments((prev) => [...prev, appointment]);
    removeTask(task.id);
  };

  const todayISO = toISO(new Date());

  const upcoming = appointments
    .filter((a) => !a.completed)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''));
  const completed = appointments
    .filter((a) => a.completed)
    .sort((a, b) => b.date.localeCompare(a.date) || (b.time || '').localeCompare(a.time || ''));

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Calendar & Tasks</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <ListTodo className="h-4 w-4" />
              <span>To-Do</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="calendar" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))}>{'<'}</Button>
              <div className="min-w-[12rem] text-center font-medium">{current.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
              <Button variant="outline" onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))}>{'>'}</Button>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="ml-2">Add appointment</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>New appointment</DialogTitle>
                  <DialogDescription>Create and track an appointment.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm mb-1 block">Title</label>
                    <Input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Session with counselor" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm mb-1 block">Date</label>
                      <Input type="date" value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm mb-1 block">Time</label>
                      <Input type="time" value={form.time || ''} onChange={(e) => setForm({ ...form, time: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Notes</label>
                    <Input value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Location, link, etc." />
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="completed" type="checkbox" checked={!!form.completed} onChange={(e) => setForm({ ...form, completed: e.target.checked })} />
                    <label htmlFor="completed" className="text-sm select-none">Mark as completed</label>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={addAppointment} disabled={!form.title || !form.date}>Save</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly view</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-sm">
                {weekdays.map((w) => (
                  <div key={w} className="text-muted-foreground text-center py-1">{w}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstWeekday }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-20 rounded-md bg-muted/30" />
                ))}
                {monthDays.map((d) => {
                  const iso = toISO(d);
                  const items = apptsByDay.get(iso) || [];
                  const isToday = iso === todayISO;
                  return (
                    <div key={iso} className={`h-20 rounded-md border ${isToday ? 'border-primary' : 'border-border'} p-2 flex flex-col`}>
                      <div className={`text-xs ${isToday ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{d.getDate()}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {items.slice(0, 3).map((a) => (
                          <Badge key={a.id} className={`text-[10px] ${a.completed ? 'bg-green-600' : 'bg-primary'}`}>{a.time ? `${a.time} · ${a.title}` : a.title}</Badge>
                        ))}
                        {items.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">+{items.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcoming.length === 0 && <div className="text-sm text-muted-foreground">No upcoming appointments.</div>}
                  {upcoming.map((a) => (
                    <div key={a.id} className="flex items-center justify-between border border-border rounded-md p-3">
                      <div>
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{a.date}{a.time ? ` • ${a.time}` : ''}</div>
                        {a.notes && <div className="text-xs text-muted-foreground">{a.notes}</div>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" onClick={() => toggleCompleted(a.id)}>Mark done</Button>
                        <Button variant="outline" onClick={() => remove(a.id)}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completed.length === 0 && <div className="text-sm text-muted-foreground">No completed appointments yet.</div>}
                  {completed.map((a) => (
                    <div key={a.id} className="flex items-center justify-between border border-border rounded-md p-3">
                      <div>
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{a.date}{a.time ? ` • ${a.time}` : ''}</div>
                        {a.notes && <div className="text-xs text-muted-foreground">{a.notes}</div>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" onClick={() => toggleCompleted(a.id)}>Mark undone</Button>
                        <Button variant="outline" onClick={() => remove(a.id)}>Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">To-Do Tasks</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Add Task</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>New Task</DialogTitle>
                  <DialogDescription>Create a new task to track.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm mb-1 block">Task Title</label>
                    <Input 
                      value={form.title || ''} 
                      onChange={(e) => setForm({ ...form, title: e.target.value })} 
                      placeholder="Enter task title" 
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Due Date</label>
                    <Input 
                      type="date" 
                      value={form.date || ''} 
                      onChange={(e) => setForm({ ...form, date: e.target.value })} 
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button 
                      onClick={() => {
                        if (form.title && form.date) {
                          addTask(form.title, form.date);
                          setOpen(false);
                          setForm({ title: '', date: toISO(new Date()), time: '', notes: '', completed: false });
                        }
                      }} 
                      disabled={!form.title || !form.date}
                    >
                      Add Task
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todoTasks.filter(task => !task.completed).length === 0 && (
                    <div className="text-sm text-muted-foreground">No pending tasks.</div>
                  )}
                  {todoTasks.filter(task => !task.completed).map((task) => (
                    <div key={task.id} className="flex items-center justify-between border border-border rounded-md p-3">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTaskCompleted(task.id)}
                          className="p-0 h-auto"
                        >
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-xs text-muted-foreground">{task.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            task.priority === 'high' ? 'bg-red-100 text-red-800' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}
                        >
                          {task.priority}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => convertTaskToAppointment(task)}>
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => removeTask(task.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todoTasks.filter(task => task.completed).length === 0 && (
                    <div className="text-sm text-muted-foreground">No completed tasks yet.</div>
                  )}
                  {todoTasks.filter(task => task.completed).map((task) => (
                    <div key={task.id} className="flex items-center justify-between border border-border rounded-md p-3">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTaskCompleted(task.id)}
                          className="p-0 h-auto"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                        <div>
                          <div className="font-medium line-through text-muted-foreground">{task.title}</div>
                          <div className="text-xs text-muted-foreground">{task.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => removeTask(task.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calendar;