# Generated by Django 3.1.7 on 2021-03-20 17:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Notes', '0006_word_wordtosentence'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sentence',
            name='child',
        ),
        migrations.RemoveField(
            model_name='sentence',
            name='user',
        ),
        migrations.RemoveField(
            model_name='word',
            name='child',
        ),
        migrations.RemoveField(
            model_name='word',
            name='user',
        ),
        migrations.RemoveField(
            model_name='wordtosentence',
            name='child',
        ),
        migrations.RemoveField(
            model_name='wordtosentence',
            name='sentence',
        ),
        migrations.RemoveField(
            model_name='wordtosentence',
            name='user',
        ),
        migrations.RemoveField(
            model_name='wordtosentence',
            name='word',
        ),
        migrations.DeleteModel(
            name='Diary',
        ),
        migrations.DeleteModel(
            name='Sentence',
        ),
        migrations.DeleteModel(
            name='Word',
        ),
        migrations.DeleteModel(
            name='WordToSentence',
        ),
    ]
