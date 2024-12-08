from rest_framework.test import APITestCase
from rest_framework import status
from .models import Task

class TaskAPITestCase(APITestCase):
    def setUp(self):
        # Tworzenie przykładowych danych
        self.task = Task.objects.create(title="Existing Task", completed=False)
        self.list_url = "/api/tasks/"

    def test_get_tasks(self):
        # Test GET /api/tasks/
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], "Existing Task")

    def test_create_task(self):
        # Test POST /api/tasks/
        data = {"title": "New Task"}
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], "New Task")

    def test_update_task(self):
        # Test PUT /api/tasks/<id>/
        url = f"/api/tasks/{self.task.id}/"
        data = {"title": "Updated Task", "completed": True}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Updated Task")
        self.assertTrue(response.data['completed'])

    def test_delete_task(self):
        # Test DELETE /api/tasks/<id>/
        url = f"/api/tasks/{self.task.id}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Task.objects.filter(id=self.task.id).exists())