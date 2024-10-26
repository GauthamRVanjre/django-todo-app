# todos/schema.py
import graphene
from graphene_django import DjangoObjectType
from .models import Todo

class TodoType(DjangoObjectType):
    class Meta:
        model = Todo

class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    todo = graphene.Field(TodoType, id=graphene.Int())

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_todo(root, info, id):
        return Todo.objects.get(pk=id)

class CreateTodoMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String()
        completed = graphene.Boolean()

    todo = graphene.Field(TodoType)

    def mutate(self, info, title, description=None, completed=False):
        todo = Todo(title=title, description=description, completed=completed)
        todo.save()
        return CreateTodoMutation(todo=todo)

class UpdateTodoMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        completed = graphene.Boolean()
        
    todo = graphene.Field(TodoType)

    def mutate(self, info, id, title=None, description=None, completed=None):
        print("received", id, title, description)
        todo = Todo.objects.get(pk=id)
        if title:
            todo.title = title
        if description:
            todo.description = description
        if completed is not None:
            todo.completed = completed
        todo.save()
        return UpdateTodoMutation(todo=todo)

class DeleteTodoMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        try:
            todo = Todo.objects.get(pk=id)
            todo.delete()
            return DeleteTodoMutation(success=True)
        except Todo.DoesNotExist:
            return DeleteTodoMutation(success=False)

class Mutation(graphene.ObjectType):
    create_todo = CreateTodoMutation.Field()
    update_todo = UpdateTodoMutation.Field()
    delete_todo = DeleteTodoMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
