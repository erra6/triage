<?php



/**
 * This is a simple Logger implementation that other Loggers can inherit from.
 *
 * It simply delegates all log-level-specific methods to the `log` method to
 * reduce boilerplate code that a simple Logger that does the same thing with
 * messages regardless of the error level has to implement.
 */
abstract class AbstractLogger implements LoggerInterface
{
    /**
     * System is unusable.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public function emergency($message, array $context = array())
    {
        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $file = $caller['file'];
        $line = $caller['line'];
        $this->log(LogLevel::EMERGENCY, $file.' : '.$line.' : '.$message, $context);
    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public function alert($message, array $context = array())
    {
        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $file = $caller['file'];
        $line = $caller['line'];
        $this->log(LogLevel::ALERT, $file.' : '.$line.' : '.$message, $context);
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public function critical($message, array $context = array())
    {
        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $file = $caller['file'];
        $line = $caller['line'];
        $this->log(LogLevel::CRITICAL, $file.' : '.$line.' : '.$message, $context);
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public function error($message, array $context = array())
    {
        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $file = $caller['file'];
        $line = $caller['line'];
        $this->log(LogLevel::ERROR, $file.' : '.$line.' : '.$message, $context);
    }

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public function warning($message, array $context = array())
    {
        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $file = $caller['file'];
        $line = $caller['line'];
        $this->log(LogLevel::WARNING, $file.' : '.$line.' : '.$message, $context);
    }

    /**
     * Normal but significant events.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public function notice($message, array $context = array())
    {
        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $file = $caller['file'];
        $line = $caller['line'];
        $this->log(LogLevel::NOTICE, $file.' : '.$line.' : '.$message, $context);
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public function info($message, array $context = array())
    {
        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $file = $caller['file'];
        $line = $caller['line'];
        $this->log(LogLevel::INFO, $file.' : '.$line.' : '.$message, $context);
    }

    /**
     * Detailed debug information.
     *
     * @param string $message
     * @param array $context
     * @return null
     */
    public function debug($message, array $context = array())
    {
        $bt = debug_backtrace();
        $caller = array_shift($bt);
        $file = $caller['file'];
        $line = $caller['line'];
        $this->log(LogLevel::DEBUG, $file.' : '.$line.' : '.$message, $context);
    }
}
