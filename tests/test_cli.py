from typer.testing import CliRunner

from rb_assistant.cli import app


def test_sync_file_dry_run_outputs_summary():
    runner = CliRunner()

    result = runner.invoke(app, ["sync-file", "tests/fixtures/kakaotalk_sample.txt", "--source-chat", "원장단톡방", "--dry-run"])

    assert result.exit_code == 0
    assert "Daily Director Brief" in result.stdout
    assert "New Materials" in result.stdout
