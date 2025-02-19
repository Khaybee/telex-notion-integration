import { ExtractedTask } from "../types";

// export const formatTaskUpdates = async (tasks: ExtractedTask[]): Promise<Record<string, any>> => {
//     const today = new Date();
  
//     const overdueTasks = tasks
//       .filter(
//         (task) => task.dueDate !== "No due date" && new Date(task.dueDate) < today
//       )
//       .map((task) => ({
//         task: task.name,
//         assignees: task.assignees,
//         dueDate: task.dueDate,
//         status: "Overdue",
//       }));
  
//     const completedTasks = tasks
//       .filter((task) => task.status === "Done")
//       .map((task) => task.name);
  
//     const upcomingTasks = tasks
//       .filter(
//         (task) => task.dueDate !== "No due date" && new Date(task.dueDate) > today
//       )
//       .map((task) => ({
//         task: task.name,
//         dueInDays: Math.ceil(
//           (new Date(task.dueDate).getTime() - today.getTime()) /
//             (1000 * 60 * 60 * 24)
//         ),
//       }));
  
//     const stuckTasks = tasks
//       .filter((task) => task.status === "In Progress")
//       .map((task) => ({
//         task: task.name,
//         status: task.status,
//         stuckForDays: Math.ceil(
//           (today.getTime() - new Date(task.dueDate).getTime()) /
//             (1000 * 60 * 60 * 24)
//         ),
//       }));
  
//     return {
//       overdueTasks,
//       completedTasks,
//       upcomingTasks,
//       stuckTasks,
//     };
//   }

export const getDueDateTasks = async (tasks: ExtractedTask[]): Promise<Record<string, any>> => {
    const today = new Date();
  
    const overdueTasks = tasks
      .filter(
        (task) => task.dueDate !== "No due date" && new Date(task.dueDate) < today
      )
      .map((task) => ({
        task: task.name,
        assignees: task.assignees,
        dueDate: task.dueDate,
        status: "Overdue",
      }));
  
    const stuckTasks = tasks
      .filter((task) => task.status === "In Progress")
      .map((task) => ({
        task: task.name,
        status: task.status,
        stuckForDays: Math.ceil(
          (today.getTime() - new Date(task.dueDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      }));
  
    return {
      overdueTasks,
      stuckTasks,
    };
  }
  
export const formatOutputMessage = (tasks: ExtractedTask[]) => {
    let message = "**📌 Notion Task Updates**\n\n";
  
    const completedTasks = tasks.filter((task) => task.status === "Done");
    const upcomingTasks = tasks.filter(
      (task) =>
        task.dueDate !== "No due date" &&
        new Date(task.dueDate) > new Date() // Future tasks
    );
    const overdueTasks = tasks.filter(
      (task) =>
        task.dueDate !== "No due date" &&
        new Date(task.dueDate) < new Date() // Past-due tasks
    );
    const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  
    overdueTasks.forEach((task) => {
      message += `🚨 **Reminder:** Task *"${task.name}"* assigned to ${
        Array.isArray(task.assignees) ? task.assignees.join(", ") : task.assignees
      } is **overdue**! (Due: ${task.dueDate})\n`;
    });
  
    if (completedTasks.length) {
      message += `✅ **Completed Tasks Today:** ${completedTasks
        .map((task) => `"${task.name}"`)
        .join(", ")}\n`;
    }
  
    upcomingTasks.forEach((task) => {
      message += `📅 **Upcoming:** Task *"${task.name}"* is due in ${
        Math.ceil(
          (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        ) // Days left
      } days.\n`;
    });

    inProgressTasks.forEach((task) => {
      message += `⏳ **No updates:** Task *"${task.name}"* is stuck in *"${task.status}"* for ${
        Math.ceil(
          (new Date().getTime() - new Date(task.dueDate).getTime()) / (1000 * 60 * 60 * 24)
        ) // Days stuck
      } days.\n`;
    });
  
    return message;
  }
  