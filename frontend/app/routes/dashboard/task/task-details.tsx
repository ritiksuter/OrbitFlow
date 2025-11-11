import { BackButton } from "~/components/back-button";
import { Loader } from "~/components/loader";
import { CommentSection } from "~/components/task/comment-section";
import { SubTasksDetails } from "~/components/task/sub-tasks";
import { TaskActivity } from "~/components/task/task-activity";
import { TaskAssigneesSelector } from "~/components/task/task-assignees-selector";
import { TaskDescription } from "~/components/task/task-description";
import { TaskPrioritySelector } from "~/components/task/task-priority-selector";
import { TaskStatusSelector } from "~/components/task/task-status-selector";
import { TaskTitle } from "~/components/task/task-title";
import { Watchers } from "~/components/task/watchers";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  useAchievedTaskMutation,
  useTaskByIdQuery,
  useWatchTaskMutation,
  useDeleteTaskMutation,
} from "~/hooks/use-task";
import { useAuth } from "~/provider/auth-context";
import type { Project, Task } from "~/types";
import { format, formatDistanceToNow } from "date-fns";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const TaskDetails = () => {
  const { user } = useAuth();
  const { taskId, projectId, workspaceId } = useParams<{
    taskId: string;
    projectId: string;
    workspaceId: string;
  }>();
  const navigate = useNavigate();

  const { data, isLoading } = useTaskByIdQuery(taskId!) as {
    data: {
      task: Task;
      project: Project;
    };
    isLoading: boolean;
  };
  const { mutate: watchTask, isPending: isWatching } = useWatchTaskMutation();
  const { mutate: achievedTask, isPending: isAchieved } = useAchievedTaskMutation();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTaskMutation();

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold">Task not found</div>
      </div>
    );
  }

  const { task, project } = data;
  const isUserWatching = task?.watchers?.some(
    (watcher) => watcher._id.toString() === user?._id.toString()
  );

  const goBack = () => navigate(-1);

  const members = task?.assignees || [];

  const handleWatchTask = () => {
    watchTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success("Task watched");
        },
        onError: () => {
          toast.error("Failed to watch task");
        },
      }
    );
  };

  const handleAchievedTask = () => {
    achievedTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success("Task achieved");
        },
        onError: () => {
          toast.error("Failed to achieve task");
        },
      }
    );
  };

  const handleDeleteTask = () => {
    if (!task?._id) return;
    deleteTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success("Task deleted successfully");
          navigate(`/workspaces/${workspaceId}/projects/${project._id}`);
        },
        onError: () => {
          toast.error("Failed to delete task");
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-2 py-4 md:px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <BackButton />

          <h1 className="text-xl md:text-2xl font-bold break-words">{task.title}</h1>

          {task.isArchived && (
            <Badge className="ml-2 mt-2 md:mt-0" variant={"outline"}>
              Archived
            </Badge>
          )}
        </div>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0 w-full md:w-auto">
          <Button
            variant={"outline"}
            size="sm"
            onClick={handleWatchTask}
            className="w-full md:w-fit"
            disabled={isWatching}
          >
            {isUserWatching ? (
              <>
                <EyeOff className="mr-2 size-4" />
                Unwatch
              </>
            ) : (
              <>
                <Eye className="mr-2 size-4" />
                Watch
              </>
            )}
          </Button>

          <Button
            variant={"outline"}
            size="sm"
            onClick={handleAchievedTask}
            className="w-full md:w-fit"
            disabled={isAchieved}
          >
            {task.isArchived ? "Unarchive" : "Archive"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
              <div>
                <Badge
                  variant={
                    task.priority === "High"
                      ? "destructive"
                      : task.priority === "Medium"
                        ? "default"
                        : "outline"
                  }
                  className="mb-2 capitalize"
                >
                  {task.priority} Priority
                </Badge>

                <TaskTitle title={task.title} taskId={task._id} />

                <div className="text-xm md:text-sm text-muted-foreground mt-3">
                  Created at:{" "}
                  {formatDistanceToNow(new Date(task.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <TaskStatusSelector status={task.status} taskId={task._id} />

                <Button
                  variant={"destructive"}
                  size="sm"
                  onClick={handleDeleteTask}
                  className="hidden md:block"
                >
                  Delete Task
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h3>

              <TaskDescription
                description={task.description || ""}
                taskId={task._id}
              />
            </div>

            <TaskAssigneesSelector
              task={task}
              assignees={task.assignees}
              projectMembers={project.members as any}
            />
            
             <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Priority
              </h3>
            <TaskPrioritySelector priority={task.priority} taskId={task._id} />

            <SubTasksDetails subTasks={task.subtasks || []} taskId={task._id} />
          </div>

          <CommentSection taskId={task._id} members={project.members as any} />
        </div>

        {/* right side */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <Watchers watchers={task.watchers || []} />

          <TaskActivity resourceId={task._id} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
