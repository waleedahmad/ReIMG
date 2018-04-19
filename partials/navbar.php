<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/"> <i class="fa fa-reddit"></i> ReIMG</a>
        </div>


        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <?php
            if($_SERVER['REQUEST_URI'] != '/' && parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) != '/settings.php'){
                ?>
                <form class="navbar-form navbar-left" action="/subreddit.php" method="get">
                    <div class="input-group">
                        <span class="input-group-addon">reddit.com/r/</span>
                        <input type="text"
                               class="form-control"
                               name="reddit"
                               value="<?=isset($_GET['reddit']) ? $_GET['reddit'] : 'NULL' ?>"
                        >
                    </div>
                </form>
                <?php
            }
            ?>

            <ul class="nav navbar-nav navbar-right">
                <li><a target="_blank" href="https://github.com/waleedahmad/reimg">
                        <i class="fa fa-github" style="font-size: 18px;"></i> Github
                    </a>
                </li>

                <?php
                    $hosts = ['127.0.0.1', 'localhost'];
                    if(in_array($_SERVER['SERVER_NAME'], $hosts)){
                        ?>
                        <li><a href="/settings.php">
                                <span class="glyphicon glyphicon-cog"> </span> Settings
                            </a>
                        </li>
                        <?php
                    }
                ?>

            </ul>
        </div>
    </div>
</nav>
