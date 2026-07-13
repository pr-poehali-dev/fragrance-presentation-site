import json
import os
import smtplib
from email.mime.text import MIMEText
import psycopg2

NOTIFY_EMAIL = 'orobey@inbox.ru'


def send_notification(name: str, phone: str, message: str) -> None:
    password = os.environ.get('SMTP_PASSWORD')
    if not password:
        return
    body = f'Новая заявка на консультацию\n\nИмя: {name}\nТелефон: {phone}\nСообщение: {message or "—"}'
    msg = MIMEText(body, _charset='utf-8')
    msg['Subject'] = 'Новая заявка с сайта'
    msg['From'] = NOTIFY_EMAIL
    msg['To'] = NOTIFY_EMAIL
    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(NOTIFY_EMAIL, password)
        server.sendmail(NOTIFY_EMAIL, [NOTIFY_EMAIL], msg.as_string())


def handler(event: dict, context) -> dict:
    '''Приём заявок на консультацию из формы сайта парфюмерии и сохранение в базу'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Имя и телефон обязательны'}),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO leads (name, phone, message) VALUES (%s, %s, %s) RETURNING id",
        (name[:200], phone[:50], message),
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    try:
        send_notification(name, phone, message)
    except Exception:
        pass

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'id': lead_id}),
    }