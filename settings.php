<!DOCTYPE html>
<html>
<?php
include('partials/header.php');
?>
<body>
<?php
include('partials/navbar.php');
require('./database/connection.php');
if($connection){
    $sql = $connection->prepare('SELECT * FROM config');
    $sql->execute();
    $settings = $sql->fetchAll();
}
?>

<div class="container">
    <div id="app">
        <div class="settings col-xs-12 col-sm-12 col-md-8 col-lg-6">
            <h3 class="text-center">
                Application Settings
            </h3>
            <form action="settings.php" method="POST">

                <div class="form-group">
                    <label for="storage_dir">Storage Directory</label>
                    <input type="text"
                           class="form-control"
                           name="storage_dir"
                           placeholder="C:/xampp/htdocs/reimg/storage"
                           value="<?=$settings[0]['value']?>"
                           required
                    />

                    <?php
                        if($_SERVER['REQUEST_METHOD'] === 'POST'){
                            $dir = $_POST['storage_dir'];
                            if(is_dir($dir)){
                                if(is_writeable($dir) && is_readable($dir)){
                                    $sql = $connection->prepare("UPDATE config set value=? WHERE name='storage_dir'");
                                    $sql->bindParam(1, $dir);
                                    if($sql->execute()){
                                        header('Location:/settings.php?success=true');
                                    }
                                }else{
                                    echo '<div class="error">Directory does not have sufficient read or write permissions</div>';
                                }
                            }else{
                                echo '<div class="error">Invalid directory or doesn\'t exist</div>';
                            }
                        }
                    ?>
                </div>

                <?php
                if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['success'])){
                    ?>
                    <div class="form-group">

                        <?php
                        if ($_GET['success'] === 'true'){
                            ?>
                            <div class="alert alert-success">Settings saved</div>
                            <?php
                        }
                        ?>
                    </div>
                    <?php
                }
                ?>

                <button type="submit" class="btn btn-default">Update Settings</button>


            </form>
        </div>
    </div>
</div>

<?php
include('partials/footer.php');
?>



</body>
</html>