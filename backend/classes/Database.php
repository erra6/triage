<?php

/**
 * Class login
 * handles the user's login and logout process
 */
class Database
{
    /**
     * @var object The database connection
     */
    private $db_connection = null;
    private $_instances = array();

    public function getDb()
    {
        if (empty($this->_instances['db']) 
            || !is_a($this->_instances['db'], 'PDO')
        ) {
            $options = array(PDO::ATTR_PERSISTENT => true, 
                             PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
                             PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC);
            try {
                $this->_instances['db'] = new PDO(DB_DNS, DB_USER, DB_PASS,$options);
                #DEBUG
                #$this->_instances['db']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            // Catch any errors
            catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        }
        return $this->_instances['db'];
    }
}
