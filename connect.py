import psycopg2 as psycopg2
import os 

class HandleData():
	def __init__(self):
		database_url = os.environ['DATABASE_URL']
		self.database_url = database_url

	def addData(self,participant_id,block,trial,trial_resp,trial_rt,trial_acc,change):
		conn = psycopg2.connect(self.database_url, sslmode='require')
		cur = conn.cursor()

		cur.execute( "SELECT id FROM <>" )		
		for row in cur:
			x = row

		id = x[0]+1
		print(id)

		try:
			cur.execute( f"INSERT INTO <> (id,participant_id,block,trial,trial_resp,trial_rt,trial_acc,change) VALUES ({id},{participant_id},{block},{trial},'{trial_resp}',{trial_rt},{trial_acc},'{change}');" )
			conn.commit()
			print(f"added data for id {id}")
			
		except (Exception, psycopg2.DatabaseError) as error:
			print(error)

		finally:
			if conn is not None:
				conn.close()

	def getData(self):
		conn = psycopg2.connect(self.database_url, sslmode='require')
		cur = conn.cursor()
		cur.execute("SELECT * FROM <>")

		for row in cur:
			print(row)

		conn.close()
