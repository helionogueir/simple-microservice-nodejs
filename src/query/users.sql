SELECT
    `u`.`id`,
    `u`.`name`,
    `u`.`age`,
    `u`.`created`
FROM `users` `u`
WHERE `u`.`id` = :id;