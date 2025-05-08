<?php 
	class DbConnect {
		//using xampp for local testing
		private $server = 'localhost';
		private $dbname = 'business_dashboard';
		private $user = 'root';
		private $pass = '';
		private $conn; // MySQLi connection object
	
		public function connect() {
			// Create a new MySQLi connection
			$this->conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
	
			// Check if connection was successful
			if ($this->conn->connect_error) {
				die("Connection failed: " . $this->conn->connect_error);
			}
	
			return $this->conn;
		}
		
	}
	
 ?>
